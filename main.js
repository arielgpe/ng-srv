#!/usr/bin/env node

//TODO comments

var program = require('commander');
var fs = require('fs');
var readline = require('readline');
var ejs = require('ejs');
var chalk = require('chalk');

var baseURL = '';
var factories = [];
var filename = '';
var moduleName = 'ngSrv';

var servicesTemplate = fs.readFileSync(
    require.resolve('./templates/angular-service.template.ejs'),
    { encoding: 'utf-8' }
);

var authTemplate = fs.readFileSync(
    require.resolve('./templates/angular-auth.template.ejs'),
    { encoding: 'utf-8' }
);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

program
    .version('0.8.1')
    .usage('[-OPTIONS] <filename>')
    .option('-a, --auth <filename>', 'create the resource file with a default auth factory')
    .parse(process.argv);


if (program.auth){
    filename = program.auth + '.js'
} else if (program.args.length > 0){
    filename = program.args + '.js'
} else {
    program.help();
}
console.log(chalk.cyan.bold('Filename: ' + filename));
rl.question("Pick a module name (press enter for default: ngSrv): ", function(name){
    if(name){
        moduleName = name
    }
    rl.question("What is your API base URL? ", function(answer){
        if(answer.length > 0){
            baseURL = answer;
            console.log("");
            nameMethods()
        } else {
            console.log(chalk.red.bold('Emtpy url. Aborting!'));
            process.exit(1);
            rl.close();
        }
    });
});

var nameMethods = function() {
    console.log("Write 'exit' or press the return key to finish");
    rl.question("Enter the path name: ", function(path){
        if (path === 'exit' || path.length === 0){
            saveFile();
            rl.close()
        } else {
            rl.question("Enter Factory name (singular): ", function(method){
                if(method === 'exit' || method.length === 0) {
                    saveFile();
                    rl.close()
                } else {
                    console.log(chalk.cyan.bold('Creating Factory named: %s for url: %s'), method.capitalize(), baseURL + path);
                    console.log(chalk.cyan.bold("with methods: \ncreate()\nupdate\nfindAll()\nfindById()\ndelete()\n"));
                    factories.push({method: method.capitalize(), url: path});
                    nameMethods()
                }
            })
        }
    })
};

var saveFile = function() {
    if (factories.length > 0){
        var template;
        if (program.auth){
            template = ejs.render(authTemplate, {
                moduleName: moduleName,
                models: factories,
                urlBase: baseURL
            });
        } else {
            template = ejs.render(servicesTemplate, {
                moduleName: moduleName,
                models: factories,
                urlBase: baseURL
            });
        }

        fs.writeFile(filename, template, function (err) {
            if (err) throw err;
            console.log(chalk.cyan.bold('Saving resources file to: ' + filename));
            process.exit(0);
        });
    } else {
        console.log(chalk.red.bold('Nothing to save. Aborting!'));
        process.exit(1);

    }

};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};