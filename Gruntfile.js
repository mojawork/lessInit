// --- dirs ---
const baseDir = "./dist";
const cssDir = "./dist/css";
const lessDir = "./src/less";
// --- dirs ---

// --- files ---
const lessFiles = {};
lessFiles[cssDir + '/master.css'] = [lessDir + '/master.less'];
const watchFiles = [lessDir + '/*.less', baseDir + '/*.html'];
const browserSyncFiles = [cssDir + '/*.css', baseDir + '/*.html'];
// --- files ---

module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    console.log(baseDir);
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: lessFiles
            }
        },
        watch: {
            styles: {
                files: watchFiles,
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: browserSyncFiles
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('serve', ['browserSync', 'less', 'watch']);
};