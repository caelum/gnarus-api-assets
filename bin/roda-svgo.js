const FS = require('fs');
const SVGO = require('svgo');
const svgo = new SVGO({
        plugins: [{
            cleanupAttrs: true,
        }, {
            removeDoctype: true,
        },{
            removeXMLProcInst: true,
        },{
            removeComments: true,
        },{
            removeMetadata: true,
        },{
            removeTitle: true,
        },{
            removeDesc: true,
        },{
            removeUselessDefs: true,
        },{
            removeEditorsNSData: true,
        },{
            removeEmptyAttrs: true,
        },{
            removeHiddenElems: true,
        },{
            removeEmptyText: true,
        },{
            removeEmptyContainers: true,
        },{
            removeViewBox: false,
        },{
            cleanupEnableBackground: true,
        },{
            convertStyleToAttrs: true,
        },{
            convertColors: true,
        },{
            convertPathData: true,
        },{
            convertTransform: true,
        },{
            removeUnknownsAndDefaults: true,
        },{
            removeNonInheritableGroupAttrs: true,
        },{
            removeUselessStrokeAndFill: true,
        },{
            removeUnusedNS: true,
        },{
            cleanupIDs: true,
        },{
            cleanupNumericValues: true,
        },{
            moveElemsAttrsToGroup: true,
        },{
            moveGroupAttrsToElems: true,
        },{
            collapseGroups: true,
        },{
            removeRasterImages: false,
        },{
            mergePaths: true,
        },{
            convertShapeToPath: true,
        },{
            sortAttrs: true,
        },{
            removeDimensions: true,
        }]
    });

const args = process.argv;

if(args.length <= 2){
    console.log('Não precisei rodar svgo');
    return;
}


for (var i = 2; i < args.length; i++) {
    (function(i){
        let filePath = `../${args[i]}`;
        FS.readFile(filePath, 'utf8', function (err, data) {

            if (err) {
                throw err;
            }

            svgo.optimize(data, {path: filePath}).then(function (result) {

                FS.writeFile(filePath, result.data, 'utf8', function (err) {
                    if (err) return console.log(err);
                });

            });

        });
    })(i);
}
