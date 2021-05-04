# Keyboard Shortcuts for Kahoot
Add custom keyboard shortcuts to Kahoot. Bind specific keys to shapes and answer faster without having to move the mouse.

## Installation

The easiest way to install is via the [Firefox Addons Store](https://addons.mozilla.org/en-US/firefox/addon/kahoot-keyboard-shortcuts/) or the [Mac App Store](https://apps.apple.com/us/app/id1534465095) for Safari.

If you want to install from source, just clone the git repo, and add the extension as a temporary addon. Information on how to do this [can be found on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

This project uses the excellent [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill/) to support the `browser` API in chrome.

The repo for the Safari version is available at [lkellar/kahoot-safari](https://github.com/lkellar/kahoot-safari).

## Usage
By default, the shortcuts are mapped to

* Triangle/Red: O
* Diamond/Blue: P
* Circle/Yellow: S
* Square/Green: D

To change these settings, go to `about:addons` and hit the preferences button for "Keyboard Shortcuts for Kahoot".

Alternatively, if the extension is in your toolbar, you can change your shortcuts from there.

Once finished updating the shortcuts, hit save, and the new shortcuts will instantly be used.