module.exports = function(grunt) {

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
    clean: {
      dev: ['.tmp/public/**'],
		  build: ['www']
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: './assets',
          src: ['**/*.!(coffee|less)'],
          dest: '.tmp/public'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: '.tmp/public',
          src: ['**/*'],
          dest: 'www'
        }]
      }
    },
    less: {
      dev: {
        files: [{
          expand: true,
          cwd: 'assets/styles/',
          src: ['importer.less'],
          dest: '.tmp/public/styles/',
          ext: '.css'
        }]
      }
    },
    sync: {
      dev: {
        files: [{
          cwd: './assets',
          src: ['**/*.!(coffee)'],
          dest: '.tmp/public'
        }]
      }
    },
    watch: {
      assets: {

        // Assets to watch:
        files: ['assets/**/*', 'pipeline.js'],

        // When assets are changed:
        tasks: ['syncAssets']
      }
    },
    cssmin: {
      dist: {
        src: ['.tmp/public/concat/production.css'],
        dest: '.tmp/public/min/production.min.css'
      }
    },
    concat: {
      js: {
        src: require('./pipeline').jsFilesToInject,
        dest: '.tmp/public/concat/production.js'
      },
      css: {
        src: require('./pipeline').cssFilesToInject,
        dest: '.tmp/public/concat/production.css'
      }
    }
  });

  // Load the required grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['compileAssets', 'watch']);


  grunt.registerTask('compileAssets', [
    'clean:dev',
    'less:dev',
    'copy:dev'
  ]);

  grunt.registerTask('syncAssets', [
    'less:dev',
    'sync:dev'
  ]);

  grunt.registerTask('build', [
		'compileAssets',
		'clean:build',
		'copy:build'
	]);

  grunt.registerTask('buildProd', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'clean:build',
		'copy:build'
	]);

};
