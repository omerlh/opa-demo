const fs = require('fs');
const util = require('util');
const process = require('process');
const child_process = require('child_process');

const asyncReaddir = util.promisify(fs.readdir);
const asyncExec = util.promisify(child_process.exec);
const asyncMkdir = util.promisify(fs.mkdir);


async function main()
{
    //TODO: validate JSON files schema before uploading them
    var items = await asyncReaddir('./policies', {withFileTypes: true});

    console.log("Build started, getting all relevant folders");

    var folders = items
        .filter(dirEntry => dirEntry.isDirectory())
        .map(dirEntry => dirEntry.name);

        await Promise.all(folders.map(async folder => {
            try {
                console.log(`Compressing folder ${folder}`);
                // Extract the git hash of the last commit in the folder and update the bundle revision
                await asyncExec(`cd policies/${folder} && cat .manifest | sed \"s/\\$revision/$(git log --pretty=format:\"%H\" -1 --no-patch -- $(PWD))/\" > .manifest && tar -zcvf ../../dist/${folder}.tar.gz * .manifest`);
            } catch(e)
            {
                console.error(`failed to archive folder ${folder}: ${e}`);
                process.exit(1);
            }
        }));
}
 
main();