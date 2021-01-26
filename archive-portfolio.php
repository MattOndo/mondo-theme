<?php
/* Template Name: Portfolio Archive */
get_header();
?>
<main id="main" class="content-wrapper">
  <div class="portfolio-grid mt5">
    <?php if (have_posts()) : ?>
      <?php
      // Start the Loop.
      while (have_posts()) :
        // You can list your posts here
        the_post();
      ?>
        <article class="portfolio-item relative">
          <div class="portfolio-item__category"><?php the_terms(get_the_id(), 'category'); ?></div>
          <a href="<?php the_permalink(); ?>" class="link" target="_blank">
            <div class="portfolio-item__thumbnail aspect-ratio aspect-ratio--16x9">
              <img class="aspect-ratio--object" src="<?php the_post_thumbnail_url(); ?>" style="height:100%;">
            </div>
            <div class="portfolio-item__title">
              <h2 class="db tc">
                <?php the_title(); ?>
              </h2>
            </div>
          </a>
        </article>
    <?php
      endwhile;
    else :
    // No Post Found
    endif;
    ?>
  </div>
</main><!-- #main -->
<?php
get_footer();
