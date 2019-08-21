/*************************************************************
 *
 *  Copyright (c) 2017-2019 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/*=====================================================================*/

(function () {

/**
 * The various CDNs and their data for how to obtain versions
 */
var CDN = {
    'cdnjs.cloudflare.com': {
        api: 'https://api.cdnjs.com/libraries/mathjax?fields=version',
        key: 'version',
        base: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/'
    },

    'rawcdn.githack.com': {
        api: 'https://api.github.com/repos/mathjax/mathjax/releases/latest',
        key: 'tag_name',
        base: 'https://rawcdn.githack.com/mathjax/MathJax/'
    },

    'gitcdn.xyz': {
        api: 'https://api.github.com/repos/mathjax/mathjax/releases/latest',
        key: 'tag_name',
        base: 'https://gitcdn.xyz/mathjax/MathJax/'
    },

    'cdn.statically.io': {
        api: 'https://api.github.com/repos/mathjax/mathjax/releases/latest',
        key: 'tag_name',
        base: 'https://cdn.statically.io/gh/mathjax/MathJax/'
    },

    'unpkg.com': {
        api: 'https://api.github.com/repos/mathjax/mathjax/releases/latest',
        key: 'tag_name',
        base: 'https://unpkg.com/mathjax@'
    },

    'cdn.jsdelivr.net': {
        api: 'https://api.github.com/repos/mathjax/mathjax/releases/latest',
        key: 'tag_name',
        base: 'https://cdn.jsdelivr.net/npm/mathjax@'
    }
};

/**
 * The data for getting release versions from GitHub
 */
var GITHUB = {
    api: 'https://api.github.com/repos/mathjax/mathjax/releases',
    key: 'tag_name'
};

/**
 * The major version number for MathJax (we will load the highest version with this initial number)
 */
var MJX_VERSION = 2;

/**
 * The name to use for the version in localStorage
 */
var MJX_LATEST = 'mjx-latest-version' + MJX_VERSION;

/**
 * The amount of time a cached version number is valid
 */
var SAVE_TIME = 1000 * 60 * 60 * 24 * 7;   // one week

/**
 * Data for the script that loaded latest.js
 */
var script = null;

/*=====================================================================*/

/**
 * Produce an error message on the console
 *
 * @param {string} message   The error message to display
 */
function Error(message) {
    if (console && console.error) {
        console.error('MathJax(latest.js): ' + message);
    }
}

/**
 * Create a ScriptData object from the given script tag and CDN
 *
 * @param {HTMLScriptElement} script   The script tag whose data is desired
 * @param {CdnData} cdn                The CDN data already obtained for the script (or null)
 * @return {ScriptData}                The data for the given script
 */
function scriptData(script, cdn) {
    script.parentNode.removeChild(script);
    var src = script.src;
    var config = src.replace(/.*?\/latest\.js(\?|$)/, '$1');
    var data = (src.match(/(\d+\.\d+\.\d+)(\/unpacked)?\/latest.js\?/) || ['', '', '']);
    return {
        tag: script,
        src: src,
        id: script.id,
        version: data[1],
        unpacked: data[2] || '',
        config: config,
        cdn: cdn
    };
}

/**
 * Check if a script refers to MathJax on one of the CDNs
 *
 * @param {HTMLScriptElement} script   The script tag to check
 * @return {boolean}                   True if the script is from a MathJax CDN
 */
function checkScript(script) {
    var CDNs = Object.keys(CDN);
    for (var i = 0, m = CDNs.length; i < m; i++) {
        var cdn = CDN[CDNs[i]];
        var url = cdn.base;
        var src = script.src;
        if (src && src.substr(0, url.length) === url && src.match(/\/latest\.js(\?|$)/)) {
            return scriptData(script, cdn);
        }
    }
    return null;
}

/**
 * @return {ScriptData}   The data for the script tag that loaded latest.js
 */
function getScript() {
    if (document.currentScript) {
        return scriptData(document.currentScript);
    }
    var script = document.getElementById('MathJax-script');
    if (script && script.nodeName.toLowerCase() === 'script') {
        return checkScript(script);
    }
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, m = scripts.length; i < m; i++) {
        var data = checkScript(scripts[i]);
        if (data) {
            return data;
        }
    }
    return null;
}

/*=====================================================================*/

/**
 * Save the version and date information in localStorage so we don't
 *   have to contact the CDN for every page that uses MathJax.
 *
 * @param {string} version   The version to save
 */
function saveVersion(version) {
    try {
        var data = version + ' ' + Date.now();
        localStorage.setItem(MJX_LATEST, data);
    } catch (err) {}
}

/**
 * Get the version from localStorage, and make sure it is fresh enough to use
 *
 * @return {string|null}   The version string (if one has been saved) or null (if not)
 */
function getSavedVersion() {
    try {
        var data = localStorage.getItem(MJX_LATEST).split(/ /);
        var version = data[0], date = data[0];
        if (date && Date.now() - parseInt(date) < SAVE_TIME) {
            return version;
        }
    } catch (err) {}
    return null;
}

/*=====================================================================*/

/**
 * Create a script tag that loads the given URL
 *
 * @param {string} url  The URL of the javascript file to be loaded
 * @param {string} id   The id to use for the script tag
 */
function loadMathJax(url, id) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    if (id) {
        script.id = id;
    }
    var head = document.head || document.getElementsByTagName('head')[0] || document.body;
    if (head) {
        head.appendChild(script);
    } else {
        Error('Can\'t find the document <head> element');
    }
}

/**
 * When we can't find the current version, use the original URL but remove the "latest.js"
 */
function loadDefaultMathJax() {
    if (script) {
        loadMathJax(script.src.replace(/\/latest\.js/, '/MathJax.js'), script.id);
    } else {
        Error('Can\'t determine the URL for loading MathJax');
    }
}

/**
 * Load the given version using the base URL and file to load
 * (if the versions differ, run latest.js from the new version
 *  in case there are important changes there)
 *
 * @param {string} version   The version of MathJax to load from
 */
function loadVersion(version) {
    var file = 'MathJax.js' + script.config;
    if (script.version && script.version !== version) {
        file = 'latest.js' + script.config;
    }
    loadMathJax(script.cdn.base + version + script.unpacked + '/' + file, script.id);
}

/**
 * Check if the given version is acceptable and load it if it is.
 *
 * @param {string} version   The version to check if it is the latest (valid) one
 * @return {boolean}         True if it is the latest version, false if not
 */
function checkVersion(version) {
    var major = parseInt(version.split(/\./)[0]);
    if (major === MJX_VERSION && !version.match(/-(beta|rc)/)) {
        saveVersion(version);
        loadVersion(version);
        return true;
    }
    return false;
}

/*=====================================================================*/

/**
 * Create an XMLHttpRequest object, if possible
 *
 * @return {XMLHttpRequest}   The XMLHttpRequest instance
 */
function getXMLHttpRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    if (window.ActiveXObject) {
        try {return new window.ActiveXObject('Msxml2.XMLHTTP')} catch (err) {}
        try {return new window.ActiveXObject('Microsoft.XMLHTTP')} catch (err) {}
    }
}

/**
 * Request JSON data from a CDN.  If it loads OK, call the action() function
 * on the data.  If not, or if the action returns false, run the failure() function.
 *
 * @param {CdnData} cdn        The CDN whose API will be used
 * @param {Function} action    The function to perform when the data are received
 * @param {Function} failure   The function to perform if data can't be obtained,
 *                               or if action() returns false
 */
function requestXML(cdn, action, failure) {
    var request = getXMLHttpRequest();
    if (request) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    !action(JSON.parse(request.responseText)) && failure();
                } else {
                    Error('Problem acquiring MathJax version: status = ' + request.status);
                    failure();
                }
            }
        };
        request.open('GET', cdn.api, true);
        request.send(null);
    } else {
        Error('Can\'t create XMLHttpRequest object');
        failure();
    }
}

/**
 * Look through the list of versions on GitHub and find the first one that
 * has the MJX_VERSION as its major version number, and load that.  If none
 * is found, run the version from which latest.js was loaded.
 */
function loadLatestGitVersion() {
    requestXML(GITHUB, function (json) {
        if (!(json instanceof Array)) return;
        for (var i = 0, m = json.length; i < m; i++) {
            if (checkVersion(json[i][GITHUB.key])) {
                return true;
            }
        }
        return false;
    }, loadDefaultMathJax);
}

/**
 * Check the CDN for its latest version, and load that, if it is an
 * acceptable version, otherwise, (e.g., the current version has a
 * higher major version that MJX_VERSION), find the highest version on
 * GitHub with the given major version and use that.  If one can't be
 * found, use the version where latest.js was loaded.
 */
function loadLatestCdnVersion() {
    requestXML(script.cdn, function (json) {
        if (json instanceof Array) {
            json = json[0];
        }
        if (!checkVersion(json[script.cdn.key])) {
            loadLatestGitVersion();
        }
        return true;
    }, loadDefaultMathJax);
}

/*=====================================================================*/


/*
 * Find the script that loaded latest.js
 * If the script is from a known CDN:
 *   Retrieve the cached version (if any)
 *   Load the given version of the file, if the version is cached,
 *   Otherwise find the latest version and load that.
 * Otherwise,
 *   Load using the version where latest.js was loaded.
 */

    script = getScript();
    if (script && script.cdn) {
        var version = getSavedVersion();
        version ?
            loadVersion(version) :
            loadLatestCdnVersion();
    } else {
        loadDefaultMathJax();
    }

})();
