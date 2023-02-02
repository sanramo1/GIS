--20230202--
# Versión 1: TF_Secure_v.1

Despliegue de entorno ArcGIS Enterprise, incluye creación de VPC con 2 subenets públicas y 2 subnets privadas, máquina rdgw (indicar CIDR de acceso RDP), ALB (Incluye Taget groups portal/server), Security Groups (RDGW-EC2-ALB) y asociación de Elastic IP a la máquina de salto e interfaz NAT del RDGW.

Antes de ejecutar:
	
	1. Crear Key Pair de acceso para la máquina de salto.
	2. Crear 2 EIPs:
		2.1. Para la máquina de salto.
		2.2. Para la interfaz NAT del RDGW, requisito para la creación del stack de la VPC.

Para ejecutar, desde la terminal dirigirse al directorio que contiene los archivos de configuración del despliegue.
UNA VEZ MODIFICADOS LOS PARÁMETROS NECESARIOS:

    1- terraform init						----> Inicializa el directorio de trabajo que contiene los fichero de configuración de Terraform.
    2- terraform validate 					----> Valida la sintaxis del código.
    3- terraform plan -var-file "certificate.tfvars" -out "xxxx.tfplan"
    										----> Genera la planificación del despliegue, definiendo el orden en que se tienen que ejecutar los recursos.
    4- terraform apply "xxxx.tfplan"		----> Ejecuta la planificación anterior.

Para borrar la configuración hecha o en caso de error y querer borrar los recursos creados, utilizar el comando:

    terraform destroy -var-file "certificate.tfvars"

Para cancelar la ejecución del código, utilizar la combinación de teclas:

    Ctrl + C (dos veces)

Esta versión tiene 6 ficheros .tf y 2 ficheros .tfvars:

    > 1_variables_init.tf :
    	Inicializa las variables con los parámetros declarados en el fichero "terraform.tfvars"

    > 2_data_sources.tf :
    	Conecta con AWS, declara el nombre del bucket como variable local, carga las Availatbility Zones
    	y el certificado para el ALB.

    > 3_vpc.tf:
    	Contiene la llamada al Stack del VPC.

    > 4_sg.tf :
    	Contiene la llamada al Cloudformation de Esri ArcGIS Enterprise.

    > 5_ec2.tf:
    	Contiene la configuración del ALB.

    > 6_alb.tf :
    	Contiene la configuración del Route53.

    > terraform.tfvars :
    	Contiene las credenciales de acceso a nuestra cuenta de AWS igual que si iniciamos aws CLI, el
    	directorio donde se guarda el KeyPair y la clave pública, y los parámetros del despliegue

    > certificate.tfvar:
    	Contiene las partes que componen el certificado para el ALB, está compuesto por el private_key, el certificate_body
    	y el certificate_chain.



Notas: 1. En terraform al igual que en Cloudformation necesitamos de la subscripción a la imagen de la ami en el Market Place antes de poder ejecutar el código.

    2. Necesitamos haber creado previamente el KeyPair en nuestra cuenta, Terraform no tiene la capacidad de generaralo, solo de importarlo.

Para ejecutar el código adaptar los parámetros y los directorios de trabajo en el equipo destinado.

    -- terraform.tfvars :
    	Este fichero tiene todas las variables que necesitan de modificación para adaptar al despliegue.

    -- certificate.tfvar:
    	Contiene los cuerpos del certificado para el ALB.

Para generar la clave pública de nuestro KeyPair (si y sólo si no la tenemos) utilizar en la ventana de comandos:
ssh-keygen -y -f /userpath/file.pem
Si encontramos problemas con el mensaje "WARNING: UNPROTECTED PRIVATE KEY FILE", revisar la siguiente documentación,
https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open

IMPORTANTE:
No hacer configuraciones de la instancia fuera de Terraform, de esta forma nos aseguramos de la estabilidad del despliegue.
¡Cambios sólo desde Terraform!

    ######################################### END #########################################
