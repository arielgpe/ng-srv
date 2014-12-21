ngSrv Documentation
====================

A simple command-line tool for creating Angular.js modules based on restful resources

Installation:
------------

    $ npm install -g ng-srv

Usage:
------
    $ ng-srv [-OPTIONS] <filename>

Options:
--------
    -h, --help             output usage information
    -V, --version          output the version number
    -a, --auth <filename>  create the resource file with a default auth factory

Instructions:
-------------
You can use the command on the following ways

    $ ng-srv nameOfFile         this will create the default file at the current directory
    $ ng-srv -a nameOfFile      this will create a file with a declared Auth factory using tokens and $http interceptors

Using the command with any of the options will prompt to:

* Enter the module name. (Default to ngSrv)
* Enter the default url.
e.g.
>> http://localhost/api/v1/ (make sure it ends with a slash)
* Enter the path name.
e.g.
>> products
* Enter the factory name for the current path
e.g.
>> product

Once you are done, press the return key or enter 'exit' to finish.


Authors:
-------
Ariel Guzman

 - [https://github.com/arielgpe](https://github.com/arielgpe)
 - [http://twitter.com/arielgpe](http://twitter.com/arielgpe)

LICENSE:
--------
ngSrv is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.