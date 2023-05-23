import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) { }


  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('role', context.getHandler());
    if (!requiredRoles) {
      return true; // Si aucun rôle n'est spécifié pour cette route, l'accès est autorisé
    }
    
    console.log("role requis: ", requiredRoles);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers.authorization);
    console.log("token: ", token);

    if (!token) {
      return false; // Si le jeton n'est pas présent dans l'en-tête de la requête, l'accès est refusé
    }
    const decodedToken = this.jwtService.verify(token); // Décode le jeton JWT

    // Vérifie si le rôle de l'utilisateur est égal à "admin" ou "customer"
    const userRole = decodedToken.role;
    const hasRequiredRole = requiredRoles.includes(userRole);

    return hasRequiredRole;
  }


  private extractTokenFromHeader(authorizationHeader: string): string | null {
    if (!authorizationHeader) {
      return null;
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer?.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
}
