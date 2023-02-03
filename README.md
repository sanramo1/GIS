-20230202-

# Versión 1: TF_Secure_v.1

Despliegue de entorno ArcGIS Enterprise, incluye creación de VPC con 2 subenets públicas y 2 subnets privadas, instancia RDGW (indicar CIDR de acceso RDP), ALB (Incluye Taget groups portal/server), Security Groups (RDGW-EC2-ALB) y asociación de Elastic IP a la máquina de salto e interfaz NAT del RDGW.

__Antes de ejecutar:__ 
1. Crear KeyPair de acceso para la máquina de salto. 
2. Crear 2 EIPs: una para la NAT GW del stack VPC y otra para RDGW.

## Ejecución

Desde la terminal dirigirse al directorio que contiene los archivos de configuración del despliegue.
UNA VEZ MODIFICADOS LOS PARÁMETROS NECESARIOS:

    1. terraform init
		Inicializa el directorio de trabajo que contiene los ficheros de configuración de Terraform.
    2. terraform validate
		Valida la sintaxis del código.
    3. terraform plan -var-file "certificate.tfvars" -out "xxxx.tfplan"	
		Genera la planificación del despliegue, definiendo el orden en que se tienen que ejecutar los recursos.
    4. terraform apply "xxxx.tfplan" 
		Ejecuta la planificación.

__Antes de ejecutar el despliegue adaptar los parámetros y los directorios de trabajo y path relativos.__

    - terraform.tfvars :
    	Este fichero tiene todas las variables que necesitan de modificación para adaptar al despliegue.

    - certificate.tfvar:
    	Contiene las secciones del certificado del ALB.

## Para borrar la configuración hecha o en caso de error y querer borrar los recursos creados, utilizar el comando:

    terraform destroy -var-file "certificate.tfvars"

## Para cancelar la ejecución del código, utilizar la combinación de teclas:

    Ctrl + C (2 veces)

__NOTA:__
Requisito haber creado previamente el KeyPair, Terraform no tiene la capacidad de generaralo, solo de importarlo.

## Para generar la clave pública de nuestro KeyPair utilizar en la ventana de comandos:
ssh-keygen -y -f /userpath/file.pem

Si encontramos problemas con el mensaje "WARNING: UNPROTECTED PRIVATE KEY FILE", revisar la siguiente documentación,
https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open

__IMPORTANTE:__
La estabilidad de los despliegues y actualizaciones dependen de no hacer cambios fuera de Terraform.


#------------------------------------------------------------------------------------#


## Contenido ficheros:

    - 1_variables_init.tf :
    	Inicializa las variables con los parámetros declarados en el fichero "terraform.tfvars"

    - 2_data_sources.tf :
    	Conecta con AWS, carga Availatbility Zones, carga AMIs RDGW y EC2, y el certificado para el ALB.

    - 3_vpc.tf:
    	Llama al Stack de la VPC.

    - 4_sg.tf :
    	Crea los SGs de las instancias RDGW y Enterprise y del ALB.

    - 5_ec2.tf:
    	Crea EC2 RDGW y asocia EIP, y EC2 Enterprise.

    - 6_alb.tf :
		Crea el ALB y las reglas de los Target Groups de Portal y Server.

    - terraform.tfvars :
		Contiene las credenciales de acceso a nuestra cuenta de AWS, el
		directorio donde se guarda el KeyPair y la clave pública, y los parámetros del despliegue

    - certificate.tfvars:
    	Contiene las partes que componen el certificado para el ALB, está compuesto por el private_key, el certificate_body
    	y el certificate_chain.

#------------------------------------------# END #------------------------------------------#
