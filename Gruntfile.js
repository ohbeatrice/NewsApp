module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['assets/scripts/main.js',
                      'assets/scripts/config.js',
                      'assets/scripts/controllers/*.js',
                      'assets/scripts/directives/*.js',
                      'assets/scripts/services/*.js',
                     ],
                dest: 'assets/scripts/app.js'
            },

        },
        watch: {
            scripts: {
                files: ['assets/scripts/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            securely_less: {
            files: ['assets/less/*'],
            tasks: ['securely_less'],
        },

        },
        less: {
        securely_less: {
            files: [
                {
                    expand: true,
                    cwd: 'assets/less',
                    src: '**/*.less',
                    dest: 'assets/css',
                    ext: '.css'
                }
            ]
        },
    },
        
        
        shell: {
            server: {
                command: "grunt watch & nws"
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-shell'); 
    
    // Default task(s).
    grunt.registerTask('default', ['concat', 'less']);
    grunt.registerTask('securely_less', ['less:securely_less']);
  
  	grunt.registerTask('develop', ['shell:server']);
    



};