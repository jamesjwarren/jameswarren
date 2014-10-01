module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'src',
      dist: 'dist',
      layoutProject: 'src/templates/layouts/project.hbs'
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      dev: {
        options: {
          sourceMap: true
        },
        files: { '<%= config.dist %>/assets/js/<%= pkg.name %>.min.js': ['<%= config.src %>/assets/js/**/*.js'] }
      },
      prod: {
        files: { '<%= config.dist %>/assets/js/<%= pkg.name %>.min.js': ['<%= config.src %>/assets/js/**/*.js'] }
      }
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{assets,content,data,templates}/**/*.{md,hbs,yml,json,less,jpg,js}'],
        tasks: ['syncAssets','assemble']
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
      options: {
        collections: [{
          name: 'project',
          sortby: 'posted',
          sortorder: 'descending'
        }],
        engine: 'Handlebars',
        flatten: true,
        assets: '<%= config.dist %>/assets',
        layout: '<%= config.src %>/templates/layouts/default.hbs',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs'
      },
      pages: {
        files: [{
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        },{
          cwd: '<%= config.src %>/content/projects/',
          dest: '<%= config.dist %>/projects/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    clean: {
      dev: ['<%= config.dist %>/**/*.{html,xml}', '<%= config.dist %>/assets/**/*.!(jpg|svg)'],
      prod: ['<%= config.dist %>/**/*.{html,xml}', '<%= config.dist %>/assets/fonts/**/*.*', '<%= config.dist %>/assets/**/*.!(svg)']
    },

    copy: {
      components: {
        files: [
          {
            expand: true,
            cwd: './bower_components/bootstrap/dist/js/',
            src: ['bootstrap.min.js'],
            dest: '<%= config.dist %>/assets/js/'
          },{
            expand: true,
            cwd: './bower_components/bootstrap/dist/fonts',
            src: ['**/*.*'],
            dest: '<%= config.dist %>/assets/fonts/'
          },{
            expand: true,
            cwd: './bower_components/jquery.easing/js/',
            src: ['jquery.easing.min.js'],
            dest: '<%= config.dist %>/assets/js/'
          }

        ]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets',
          src: ['**/*.!(coffee|less|svg|js)'],
          dest: '<%= config.dist %>/assets/'
        }]
      }
    },

    less: {
      dev: {
        options: {
          paths: ['<%= config.src %>/assets/styles','bower_components'],
          sourceMap: true,
          sourceMapFilename: "<%= config.dist %>/assets/styles/theme.css.map",
          sourceMapBasepath: "<%= config.src %>/assets/styles/",
          sourceMapURL: "http://localhost:9000/assets/styles/theme.css.map"
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
          src: ['**/*.!(coffee|less|svg)'],
          dest: '<%= config.dist %>/assets/'
        }]
      }
    },

    // provide optimisation for svg graphics
    // SVG-Cleaner is still providing much better optimisation, this is not currently active
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: true },
          { removeUselessStrokeAndFill: false },
          { transformsWithOnePath: true },
          { removeRasterImages: true },
          { removeTitle: true },
          { transformsWithOnePath: true },
          { sortAttrs: true }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/images/',
          src: ['**/*.svg','/*.svg'],
          dest: '<%= config.dist %>/assets/images/'
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
    'uglify:dev',
    'sync:assets',
    'copy:components'
  ]);

  grunt.registerTask('compileAssetsProd', [
    'clean:prod',
    'less:prod',
//    'svgmin',
    'uglify:prod',
    'copy:assets',
    'copy:components'
  ]);


  grunt.registerTask('syncAssets', [
    'less:dev',
    'uglify:dev',
    'sync:assets'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
		'compileAssets',
    'assemble'
	]);

  grunt.registerTask('buildProd', [
		'compileAssetsProd',
    'assemble'
	]);

};
