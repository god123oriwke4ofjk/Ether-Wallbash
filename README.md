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

## Setting it up as your new tab page

### The recommended way

---

Download the new tab override extension for your browser, and in your extension settings point it at https://lookingcoolonavespa.github.io/Ether/.

[Chrome extension](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)

[Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/)

### For a creamier, buttery experience (proceed at your own risk)

---
This method introduces some known [privacy and security flaws](https://www.mdsec.co.uk/2020/04/abusing-firefox-in-enterprise-environments/). 

[For firefox users as that's the only browser I have experience with, sorry guys]

1. **Getting the files**

Download the code via the "<> Code" button and extract it somewhere
or if you're comfortable with the terminal, you can run `gh repo clone lookingcoolonavespa/Ether`.

Remember where you store it because we're going to come back to it later.

If you want to build it yourself, the build command is `npm run build`.

2. **Setting up nginx**

   1. Install Nginx: If you haven't already, you'll need to install Nginx on your machine. You can do this using your package manager or by downloading the latest version from the Nginx website.

   2. Serving your site: Next, you'll need to configure Nginx to serve your site files. Open the Nginx configuration file (usually located at /etc/nginx/nginx.conf if you're using linux) in a text editor, and add the following code inside the http block:

   ```
       server {
           listen 8000;
           root PATH_TO_THE_CODE/dist;
           index index.html;
       }
   ```

   This tells Nginx to listen on port 8000 and serve files from the "dist" folder of your code directory. The "dist" folder is where the build is located. The "index" directive tells Nginx to look for an index.html file by default when serving the site.

   3. Adding a cache: To give your server that coconut butter you want to add a cache. Add the following code:

   ```
        proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m inactive=2d;

        server {
            (code you copied from above)

            location / {
                # Enable caching for 10 days
                expires 10d;
                add_header Cache-Control public;

                # Use the cache zone defined earlier
                proxy_cache my_cache;
                proxy_cache_valid 200 2d;
                proxy_cache_bypass $http_pragma;
                proxy_cache_revalidate on;
                proxy_cache_min_uses 1;
                proxy_cache_methods GET HEAD;
                proxy_cache_key "$scheme$request_method$host$request_uri";
            }
        }
   ```

   4. Start Nginx: Once you've configured Nginx, you can start it by running the following command:

   `sudo systemctl start nginx`

   This will start the Nginx service in the background.

   Verify that your site is working: Open a web browser and navigate to http://localhost:8000. You should see your site's content.

   That's it! You now have Nginx serving your site locally on your machine. You can stop the Nginx service by running sudo systemctl stop nginx, and you can restart it by running `sudo systemctl restart nginx`. If you need to make changes to your site files or Nginx configuration, you'll need to restart the Nginx service for the changes to take effect.

   (written with help from ChatGPT)

3. **Setting up your browser**

   1. Create a file called local-settings.js.

   2. In this file, paste the following lines:

   ```
       // The file must begin with a comment
       pref("general.config.filename", "mozilla.cfg");
       pref("general.config.obscure_value", 0);
       pref("general.config.sandbox_enabled", false);

   ```

   3. Find your firefox directory and place local-settings.js in /YOUR_FIREFOX_DIR/default/pref/

   4. Create another file called mozilla.cfg and paste the following lines:

   ```

   // The file must begin with a comment
   var {classes:Cc, interfaces:Ci, utils:Cu} = Components;

   /_ set new tab page _/
   try {
       Cu.import("resource:///modules/AboutNewTab.jsm");
       var newTabURL = "http://localhost:8000";
       AboutNewTab.newTabURL = newTabURL;
   } catch(e){Cu.reportError(e);} // report errors in the Browser Console

    // Auto focus new tab content
    try {
        Cu.import("resource://gre/modules/Services.jsm"); /* if you're using firefox 117 or above remove this line */
        Cu.import("resource:///modules/BrowserWindowTracker.jsm");

        Services.obs.addObserver((event) => {
            window = BrowserWindowTracker.getTopWindow();
            window.gBrowser.selectedBrowser.focus();
            }, "browser-open-newtab-start");

    } catch(e) { Cu.reportError(e); }

   ```

   5. Place this file in your firefox directory.

There you go. Now you're set up for the creamy, smooth, velvety, super silky experience that you deserve.

## Resources/Inspiration

[Hero Patterns by Steve Schoger](www.heropatterns.com)

[Fludity start page by PrettyCoffee](https://github.com/PrettyCoffee/fluidity/tree/main/src)

[Startpage by voxie12](https://github.com/voxie12/voxie12.github.io)
