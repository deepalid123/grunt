
// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

      // configure jshint to validate js files --- run command grunt jshint
	    jshint: {
	      options: {
	        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
	      },

	      // when this task is run, lint the Gruntfile and all js files in src
	      build: ['Gruntfile.js', 'src/**/*.js']
	    },
     		pkg: grunt.file.readJSON('package.json'),

        // configure uglify to minify js files -- run command grunt uglify
	    uglify: {
	      options: {
	        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	      },
	      build: {
	        files: {
	          'dist/js/magic.min.js': 'src/js/magic.js'
	        }
	      }
	    },

        // compile less stylesheets to css --- run command grunt less
	    less: {
	      build: {
	        files: {
	          'dist/css/pretty.css': 'src/css/pretty.less'
	        }
	      }
	    },

     // configure cssmin to minify css files -- run command grunt cssmin
	    cssmin: {
	      options: {
	        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	      },
	      build: {
	        files: {
	          'dist/css/style.min.css': 'src/css/style.css'
	        }
	      }
	    },
	 // concatenate the three specified source files - run command grunt concat
	    concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['src/js/magic.js', 'src/js/magic1.js'],
		      dest: 'dist/js/built.js',
		    },
		  },


  });

	 // ========= // CREATE TASKS =========

	// this default task will go through all configuration (dev and production) in each task - run command grunt
	  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less', 'concat']);

	  // this task will only run the dev configuration - run command grunt dev
	  grunt.registerTask('dev', ['jshint', 'uglify', 'cssmin', 'less', 'concat']);

	  // only run production configuration - run command grunt production
	  grunt.registerTask('production', ['jshint', 'uglify', 'cssmin', 'less', 'concat']);


  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

};