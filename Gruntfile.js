module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['assets/css'],

    env : {
      heroku : {
        src : ".env"
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ext: 'js,html,md,nunjucks' 
        }
      }
    },

    sass: {
      options: {
        includePaths: ['node_modules/normalize-scss/sass']
      },
      dist: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        },
        files: {
          'assets/css/nhsuk.css': 'assets/stylesheets/nhsuk.scss',
          'assets/css/nhsuk-print.css': 'assets/stylesheets/nhsuk-print.scss'
        }
      }
    },

    watch: {
			css: {
				files: ['assets/stylesheets/**/*.scss'],
				tasks: ['sass']
			}
		},

    concurrent: {
  		target: {
  			tasks: ['nodemon', 'watch'],
  			options: {
  				logConcurrentOutput: true
  			}
  		}
  	}

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('generate-assets', [
    'clean',
    'sass'
  ]);

  grunt.registerTask('default', [
    'generate-assets',
    'env:heroku',
    'concurrent:target'
  ]);

};
