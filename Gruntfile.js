module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    config: {
      src: 'src',
      dist: 'dist'
    },
    
//    uglify: {
//      options: {
//        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//      },
//      build: {
//        src: 'src/<%= pkg.name %>.js',
//        dest: 'build/<%= pkg.name %>.min.js'
//      }
//    },
    
    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },
    
    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: [],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },
    
    clean: {
      dev: ['<%= config.dist %>/**/*.{html,xml}', '<%= config.dist %>/assets/**/*.!(jpg|svg)'],
      prod: ['<%= config.dist %>/**/*.{html,xml}', '<%= config.dist %>/assets/']
    },
    
    copy: {
      components: {
        files: [
          {
            expand: true,
            cwd: './bower_components/bootstrap/dist/js/',
            src: ['bootstrap.min.js'],
            dest: '<%= config.dist %>/assets/js/'
          },
          {
            expand: true,
            cwd: './bower_components/bootstrap/dist/fonts',
            src: ['**/*.*'],
            dest: '<%= config.dist %>/assets/fonts/'
          }
        ]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets',
          src: ['**/*.!(coffee|less)'],
          dest: '<%= config.dist %>/assets/'
        }]
      }
    },
    
    less: {
      dev: {
        options: {
          paths: ['<%= config.src %>/assets/styles','bower_components']
        },
        files: {
          '<%= config.dist %>/assets/styles/theme.css': '<%= config.src %>/assets/styles/importer.less'
        }
      },
      prod: {
        options: {
          paths: ['<%= config.src %>/assets/styles','bower_components'],
          cleancss: true
        },
        files: {
          '<%= config.dist %>/assets/styles/theme.css': '<%= config.src %>/assets/styles/importer.less'
        }
      }
    },
    
    sync: {	
      assets: {
        files: [{		
          cwd: '<%= config.src %>/assets/',	
          src: ['**/*.!(coffee|less)'],	
          dest: '<%= config.dist %>/assets/'	
        }]		
      }		
    }
    
  });

  // Load assemble
  grunt.loadNpmTasks('assemble');

  // Default task(s).
  grunt.registerTask('default', ['server']);


  grunt.registerTask('compileAssets', [
    'clean:dev',
    'less:dev',
    'sync:assets'
  ]);
  
  grunt.registerTask('compileAssetsProd', [
    'clean:prod',
    'less:prod',
    'copy:assets'
  ]);
  
  
  grunt.registerTask('syncAssets', [
    'less:dev',
    'sync:assets'
  ]);
  
  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
		'compileAssets',
		'copy:components',
    'assemble'
	]);
  
  grunt.registerTask('buildProd', [
		'compileAssetsProd',
		'copy:components',
    'assemble'
	]);

};
