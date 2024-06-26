const { EleventyRenderPlugin } = require("@11ty/eleventy");

const Image = require("@11ty/eleventy-img");

const faviconsPlugin = require("eleventy-plugin-gen-favicons");

// Table of Content for markdown
const pluginTOC = require('eleventy-plugin-toc');

// search
const { execSync } = require('child_process');

module.exports = function(eleventyConfig) {
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy("./src/styles");

    // Watch the `css` directory for changes
    eleventyConfig.addWatchTarget('./src/styles');

    eleventyConfig.addPassthroughCopy("./src/assets/");

    eleventyConfig.addPassthroughCopy("./src/media/");

    eleventyConfig.addPassthroughCopy("./src/img-original/");

    eleventyConfig.addPassthroughCopy("./src/images/");

    // favicon plugin
    eleventyConfig.addPlugin(faviconsPlugin, {});

    eleventyConfig.addPlugin(pluginTOC, {
      ul: true,
      wrapper: 'toc',
      wrapperClass: 'menu-list'
    });

    // Image shortcode
    eleventyConfig.addShortcode("image", async function(src, alt, width) {
      const widths = width ? [width, width * 2] : [300, 800, "auto"];
      let metadata = await Image(`./src/images/${src}`, {
        widths: widths,
        formats: ["avif", "jpeg"],
              urlPath: "/images/",
              outputDir: "_site/images/"
      });

      let imageAttributes = {
        alt,
        sizes: "(min-width: 30em) 50vw, 100vw",
        loading: "lazy",
        decoding: "async",
      };

      // You bet we throw an error on a missing alt (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes);
    });

    //pagefind indexing after site building
    eleventyConfig.on('eleventy.after', () => {
        execSync(`npx pagefind --site _site`, { encoding: 'utf-8' })
    });

    // Return your Object options:
    return {
      dir: {
        input: "src"
      }
    }
  };