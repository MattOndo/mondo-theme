<?php
get_header();
?>
<main id="main" class="content-wrapper">
  <?php if (have_posts()) : ?>
    <?php
    // Start the Loop.
    while (have_posts()) :
      // You can list your posts here
      the_post();
    ?>
      <article class="archive-item flex flex-column flex-row-ns items-center mt6">
        <div class="post-thumbnail w-100 w-40-ns pr0 pr4-ns">
          <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail(); ?>
          </a>
        </div>
        <div class="post-description w-100 w-60-ns pl0 pl4-ns">
          <div class="post-title">
            <a href="<?php the_permalink(); ?>">
              <h2>
                <?php the_title(); ?>
              </h2>
            </a>
          </div>
          <div class="post-meta">
            <?php the_date(); ?>
          </div>
          <?php the_excerpt(); ?>
        </div>
      </article>
  <?php
    endwhile;
  else :
  // No Post Found
  endif;
  ?>
</main><!-- #main -->
<?php
get_footer();
