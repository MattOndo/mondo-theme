<?php
add_action('after_setup_theme', 'mondo_theme_setup');
function mondo_theme_setup()
{
  load_theme_textdomain('mondo-theme', get_template_directory() . '/languages');
  add_theme_support('title-tag');
  add_theme_support('automatic-feed-links');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form'));
  global $content_width;
  if (!isset($content_width)) {
    $content_width = 1920;
  }
  register_nav_menus(array('main-menu' => esc_html__('Main Menu', 'mondo-theme')));
}


/**
 * Load stylesheet
 */
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_styles', 99 );
function hello_elementor_child_enqueue_styles() {
	wp_enqueue_style( 'mondo-theme', get_stylesheet_directory_uri() . '/style.css', '' );
}

/**
 * Load javascript
 */
add_action( 'wp_footer', 'hello_elementor_child_enqueue_javascript' );
function hello_elementor_child_enqueue_javascript() {
	wp_enqueue_script( 'mondo-theme', get_stylesheet_directory_uri() . '/js/main.min.js', '', false );
}

add_filter('the_title', 'mondo_theme_title');
function mondo_theme_title($title)
{
  if ($title == '') {
    return '...';
  } else {
    return $title;
  }
}

add_filter('the_content_more_link', 'mondo_theme_read_more_link');
function mondo_theme_read_more_link()
{
  if (!is_admin()) {
    return ' <a href="' . esc_url(get_permalink()) . '" class="more-link">...</a>';
  }
}

add_filter('excerpt_more', 'mondo_theme_excerpt_read_more_link');
function mondo_theme_excerpt_read_more_link($more)
{
  if (!is_admin()) {
    global $post;
    return ' <a href="' . esc_url(get_permalink($post->ID)) . '" class="more-link">...</a>';
  }
}

add_filter('intermediate_image_sizes_advanced', 'mondo_theme_image_insert_override');
function mondo_theme_image_insert_override($sizes)
{
  unset($sizes['medium_large']);
  return $sizes;
}

add_action('widgets_init', 'mondo_theme_widgets_init');
function mondo_theme_widgets_init()
{
  register_sidebar(array(
    'name' => esc_html__('Sidebar Widget Area', 'mondo-theme'),
    'id' => 'primary-widget-area',
    'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
    'after_widget' => '</li>',
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
  ));
}

add_action('wp_head', 'mondo_theme_pingback_header');
function mondo_theme_pingback_header()
{
  if (is_singular() && pings_open()) {
    printf('<link rel="pingback" href="%s" />' . "\n", esc_url(get_bloginfo('pingback_url')));
  }
}

add_action('comment_form_before', 'mondo_theme_enqueue_comment_reply_script');
function mondo_theme_enqueue_comment_reply_script()
{
  if (get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }
}

function mondo_theme_custom_pings($comment)
{
?>
  <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
<?php
}
add_filter('get_comments_number', 'mondo_theme_comment_count', 0);
function mondo_theme_comment_count($count)
{
  if (!is_admin()) {
    global $id;
    $get_comments = get_comments('status=approve&post_id=' . $id);
    $comments_by_type = separate_comments($get_comments);
    return count($comments_by_type['comment']);
  } else {
    return $count;
  }
}

function overwrite_permalink( $url, $post ) {
    // If the custom_permalink ACF field is set get it's value
    $custom_permalink = get_field( 'custom_permalink', $post->ID );
    
    // If the custom_permalink is set and the post type is news change the URL to the custom_permalink value
    if ( $custom_permalink && 'portfolio' === get_post_type( $post->ID ) ) {
        $url = $custom_permalink;
    }

    // Return the value of the URL
    return $url;
}
add_filter( 'post_type_link', 'overwrite_permalink', 10, 2 );

/**
 * Remove archive labels.
 * 
 * @param  string $title Current archive title to be displayed.
 * @return string        Modified archive title to be displayed.
 */
function my_theme_archive_title( $title ) {
	if ( is_category() ) {
		$title = single_cat_title( '', false );
	} elseif ( is_tag() ) {
		$title = single_tag_title( '', false );
	} elseif ( is_author() ) {
		$title = '<span class="vcard">' . get_the_author() . '</span>';
	} elseif ( is_post_type_archive() ) {
		$title = post_type_archive_title( '', false );
	} elseif ( is_tax() ) {
		$title = single_term_title( '', false );
	} elseif ( is_home() ) {
		$title = single_post_title( '', false );
	}

	return $title;
}
add_filter( 'get_the_archive_title', 'my_theme_archive_title' );