# Ether - an aesthetic, functional startpage
Navigate to your favorite sites with just a keypress or start a search with the `Shift` key. To navigate to a site, hit the `Ctrl` key before typing the address.
Tab through your links with either the `Tab` key or your arrow keys.
It's not mobile friendly as it was designed for use on a laptop/desktop.

[Live Demo](https://nksupermarket.github.io/Ether/)
## Pre-configured themes

[🔽 Skip to configuration](#after-images)

Swap out the colors or the image if they're not to your liking. Here are some pre-configured themes to get you started.
Everforest Dark
![Ether - Everforest Dark theme](https://i.postimg.cc/jjggsXtx/everforest-dark.jpg)
Tokyo Night
![Ether - Tokyo Night theme](https://i.postimg.cc/zGNPpvxr/catppuccin.jpg)
Dracula
![Ether - Dracula theme](https://i.postimg.cc/q7MDVYfD/dracula.jpg)
Gruvbox Retro
![Ether - Gruvbox Retro theme](https://i.postimg.cc/bJZ6dtwQ/gruvbox.jpg)
Eternal Arctic
![Ether - Eternal Arctic theme](https://i.postimg.cc/kgyYHCHt/nord.jpg)
Vanta Black
![Ether - Vanta Black theme](https://i.postimg.cc/28hK4hFG/b-w.jpg)
Frosted Glass
![Ether - Frosted Glass Theme](https://i.postimg.cc/HL7K1sy4/250704-16h38m32s-screenshot.png)
Crimson Blue
![Ether - Crimson Blue Theme](https://i.postimg.cc/0y434Jby/250704-16h38m06s-screenshot.png)
Decay Green
![Ether - Decay Green Theme](https://i.postimg.cc/2SyMTxjt/250704-16h37m43s-screenshot.png)
Edge Runner
![Ether - Edge Runner Theme](https://i.postimg.cc/282g4tYv/250704-16h37m16s-screenshot.png)
Graphite Mono
![Ether - Graphite Mono Theme](https://i.postimg.cc/rmWPn8vD/graphite-mono.png)
Material Sakura
![Ether - Material Sakura Theme](https://i.postimg.cc/28zPLDsr/250704-16h36m52s-screenshot.png)
One Dark
![Ether - One Dark Theme](https://i.postimg.cc/XNKRvJDs/250704-16h36m18s-screenshot.png)
Synth Wave
![Ether - Synth Wave Theme](https://i.postimg.cc/nr1gSRQy/250704-16h35m44s-screenshot.png)
Oxo Carbon
![Ether - Oxo Carbon Theme](https://i.postimg.cc/wjMYNG9r/250707-00h22m33s-screenshot.png)
Obsidian Purple
![Ether - Obsidian Purple Theme](https://i.postimg.cc/zBCc3tpy/250704-16h39m40s-screenshot.png)
Catppuccin Mocha
![Ether - Catppuccin Mocha Theme](https://i.postimg.cc/8kRYLzR3/mocha.png)
Catppuccin Latte
![Ether - Catppuccin Latte Theme](https://i.postimg.cc/ZnSDXGSV/latte.png)
Nordic Blue
![Ether - Nordic Blue Theme](https://i.postimg.cc/gjHBpgcd/nord.png)
Rosé Pine
![Ether - Rosé Pine Theme](https://i.postimg.cc/TwrzG8cK/250707-00h22m51s-screenshot.png)
Virtual Witches
![Ether - Virtual Witches Theme](https://i.postimg.cc/8PT04gwC/virtual.png)
BlueSky
![Ether - BlueSky Theme](https://i.postimg.cc/BQWKfJRq/250705-20h41m52s-screenshot.png)
<p id="after-images"></p>

[🔼 Back to top](#ether---an-aesthetic-functional-startpage)

## Configuration Options
- colors
- links
- keybinds
- image (gif can also work)
  - image position (if your image is cropped, this sets where the image crop happens)
- search engine (google, ddg, + 1 custom search engine)
  - to enter a custom search engine, you need to find the query url for the search engine eg. for google it is https://www.google.com/search
You can download your configuration as JSON if you want to store it somewhere.
![Ether settings - import json](https://i.postimg.cc/XYtzwZ8p/ether-settings.jpg)
To quickly get you up to speed, there's an option to import json.
The import json option allows you to import your settings piece-by-piece ( ie. importing only links and theme ) or all at once.

## Running Ether with HyDE

---
This method allows Ether to dynamically follow your HyDE theme so it will update automatically whenever your theme changes.

It requires building Ether locally and serving it with nginx.

1. **Clone the repository**

```
git clone https://github.com/god123oriwke4ofjk/Ether-Wallbash
cd Ether-Wallbash
```

2. **Install dependencies and build**

Run the setup script:
```
npm run setup
```
Then build the project:
```
npm run build
```
This will generate the compiled site inside a dist/ folder.

3. **Create a directory for nginx**

create a directory ether inside /var/www.
```
sudo mkdir -p /var/www/ether
```
Depending on your system configuration, nginx may need permission to read this directory

commonly nginx runs as the http user on arch-based systems.

you may need to change ownership:
```
sudo chown http:http /var/www/ether
```
afterwards move the built files:
```
sudo mv dist /var/www/ether/
```

4. **Configure nginx**

Create an nginx server configuration that serves the Ether directory.

/etc/nginx/sites-available/ether:
```
server {

  listen 80;  # change to 8080 if you want non-root

  server_name localhost;  # or your IP/domain if remote access needed


  root /var/www/ether/dist; 

  index index.html;  


  location / {

    try_files $uri $uri/ =404;  # Serve files, 404 on missing

  }


  gzip on;

  gzip_types text/plain text/css application/javascript image/*;

  gzip_vary on;


  location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {

    expires 30d;

    add_header Cache-Control "public";

  }

}
```

You will also need to add 
```
include /etc/nginx/sites-enabled/*;
```
to /etc/nginx/nginx.conf, in the http{}, section

and afterwards create a symlink
```
sudo ln -s /etc/nginx/sites-available/ether /etc/nginx/sites-enabled/
```
and restart nginx

```
sudo nginx -t && sudo systemctl restart nginx
```

5. **Enable HyDE wallbash theme integration**

to make ether follow your hyde theme dynamically

create the file ~/.config/hyde/wallbash/theme/ether.dcol with the following contents:
```
/dev/null|${confDir}/hyde/wallbash/scripts/ether.sh
```

afterwards from within the cloned repository

you will need to setup the ether themes inside you Hyde themes

simply move each theme inside src/data/themes into a Hyde theme with a matching name in ~/.config/hyde/themes

you can do this manually or use a simple script such as:

```
#!/bin/bash

SRC="ts_files"
DEST="target_folders"

for file in "$SRC"/*.ts; do
    name=$(basename "$file" .ts)
    target="$DEST/$name"

    if [ -d "$target" ]; then
        mv "$file" "$target/"
        echo "Moved $file -> $target/"
    else
        echo "Folder $target not found"
    fi
done
```

move the file ether.sh into ~/.config/hyde/wallbash/scripts/

and finally, open localhost, go to settings, select the Wallbash theme 

Once selected, ether will dynamically update based on your HyDE theme

set it up as the default new tab with a new tab override extension:

[Chrome extension](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)

[Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/)
