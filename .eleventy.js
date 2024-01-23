const { EleventyRenderPlugin } = require("@11ty/eleventy");

const Image = require("@11ty/eleventy-img");

const faviconsPlugin = require("eleventy-plugin-gen-favicons");

module.exports = function(eleventyConfig) {
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy("./src/styles");

    // Watch the `css` directory for changes
    eleventyConfig.addWatchTarget('./src/styles');

    eleventyConfig.addPassthroughCopy("./src/assets/");

    eleventyConfig.addPassthroughCopy("./src/files/");

    eleventyConfig.addPassthroughCopy("./src/img-original/");

    // favicon plugin
    eleventyConfig.addPlugin(faviconsPlugin, {});
    
    // Return your Object options:
    return {
      dir: {
        input: "src"        
      }
    }
  };