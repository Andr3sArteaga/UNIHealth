from dataclasses import dataclass
from typing import Any, Dict, Union, Optional

from django.contrib.auth.hashers import check_password, identify_hasher
from rest_framework import serializers

from .models import Usuario, Role


@dataclass
class AuthResult:
    ok: bool
    user: Optional[Usuario] = None
    error: Optional[str] = None


def check_passhash(stored_hash: str, raw_password: str) -> bool:
    """
    Comprueba la contraseña comparando contra un hash estilo Django.
    Si el hash no es reconocible por Django, retorna False.
    """
    try:
        identify_hasher(stored_hash)  # valida formato
    except Exception:
        return False
    return check_password(raw_password, stored_hash)


def authenticate_user(email: str, password: str) -> AuthResult:
    """
    Autenticación contra app.usuarios usando pass_hash. Requiere que el hash sea compatible con Django.
    """
    try:
        usuario = Usuario.objects.select_related("rol").get(email=email)
    except Usuario.DoesNotExist:
        return AuthResult(ok=False, error="Credenciales inválidas")

    if not usuario.activo:
        return AuthResult(ok=False, error="Usuario inactivo")

    if not check_passhash(usuario.pass_hash, password):
        return AuthResult(ok=False, error="Credenciales inválidas")

    return AuthResult(ok=True, user=usuario)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, trim_whitespace=False)


class MeSerializer(serializers.ModelSerializer):
    rol = serializers.CharField(source="rol.nombre")

    class Meta:
        model = Usuario
        fields = ["id", "email", "rol", "activo", "creado_en", "actualizado_en", "ultimo_login"]


class RegisterSerializer(serializers.Serializer):
    """
    Serializer de registro con perfil de paciente completo.
    """

    # Basic account fields
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8, trim_whitespace=False)
    nombre = serializers.CharField(max_length=255)
    cedula = serializers.CharField(max_length=50)
    role = serializers.CharField(required=False, allow_blank=True)
    
    # Patient profile fields
    fecha_nacimiento = serializers.DateField(required=False, allow_null=True)
    telefono = serializers.CharField(max_length=20, required=False, allow_blank=True)
    direccion = serializers.CharField(max_length=500, required=False, allow_blank=True)
    contacto_emergencia_nombre = serializers.CharField(max_length=255, required=False, allow_blank=True)
    contacto_emergencia_telefono = serializers.CharField(max_length=20, required=False, allow_blank=True)
    alergias = serializers.CharField(required=False, allow_blank=True)
    medicamentos_actuales = serializers.CharField(required=False, allow_blank=True)
    condiciones_medicas = serializers.CharField(required=False, allow_blank=True)
    tipo_sangre = serializers.CharField(max_length=5, required=False, allow_blank=True)
    numero_seguro_social = serializers.CharField(max_length=50, required=False, allow_blank=True)
    numero_poliza = serializers.CharField(max_length=100, required=False, allow_blank=True)
    compania_seguro = serializers.CharField(max_length=255, required=False, allow_blank=True)

    def validate_email(self, value: str) -> str:
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email ya registrado")
        return value

    def validate_role(self, value: str) -> str:
        if not value:
            return "user"
        nombre = value.strip().lower()
        if not Role.objects.filter(nombre=nombre).exists():
            raise serializers.ValidationError("Rol inválido")
        return nombre

