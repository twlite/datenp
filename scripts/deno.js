/* eslint-disable */
const REGEX = /(import|export) (.+) from ("|')(.+)("|')/g;
const rimraf = require("rimraf");
const readdirp = require("readdirp");
const fs = require("fs-extra");
const path = require("path");
const getPath = (i) => `${__dirname}/../${i}`;

// delete old files
rimraf(getPath("deno"), (err) => {
    if (err) return console.log(err);
    execute();
});

function execute() {
    // copy node scripts to deno
    fs.copySync(getPath("src"), getPath("deno"), {
        recursive: true,
        overwrite: true
    });

    // copy readme file
    fs.copyFileSync(getPath("README.md"), getPath("deno/README.md"));

    // load copied files
    readdirp.promise(getPath("deno"), {
        fileFilter: "*.ts"
    })
        .then(entries => {
            // map files by path and content
            const files = entries.map(m => ({
                path: m.fullPath,
                data: fs.readFileSync(m.fullPath, "utf-8")
            }));

            for (const file of files) {
                file.data = `// @ts-nocheck\n${file.data}`;
                // match imports
                if (file.data.match(REGEX)) {
                    // update imports for each match
                    for (const item of file.data.matchAll(REGEX)) {
                        // if import path does not end with .ts, append .ts
                        if (!item[4].endsWith(".ts") && !path.isAbsolute(item[4])) {
                            file.data = file.data.replace(item[4], `${item[4]}.ts`);
                            console.log(`[Deno Builder] import path "${item[4]}" => "${item[4]}.ts"`);
                        }
                    }
                }
                // finally save
                fs.writeFileSync(file.path, file.data);
            }
        });
}