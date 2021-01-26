    </div>
    <footer id="footer" class="pa4 tc">
      <nav>
        <?php wp_nav_menu(array('theme_location' => 'main-menu')); ?>
      </nav>
      <div id="copyright" class="f7">
        <p>&copy; <?php echo esc_html(date_i18n(__('Y', 'mondo-theme'))); ?> <?php echo esc_html(get_bloginfo('name')); ?> | <a href="/privacy-policy/" class="link">Privacy Policy</a><?php if( current_user_can('administrator') ) { ?> | <a href="/wp-admin/" class="link">Admin</a><?php } ?></p>
      </div>
    </footer>
  </div>
  <div id="offcanvas">
    <?php wp_nav_menu(array('theme_location' => 'main-menu')); ?>
  </div>
  <?php wp_footer(); ?>
  </div>
</body>

</html>