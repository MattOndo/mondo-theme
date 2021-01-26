<?php get_header(); ?>

<main id="main" class="content-wrapper">

  <?php while ( have_posts() ) : the_post(); ?>
    <article>
      <?php the_content( ); ?>
    </article>

  <?php endwhile; // end of the loop. ?>

  </main><!-- #main -->

<?php get_footer(); ?>