<?php
/*
Plugin Name: SW_ajax-load-post
Plugin URI: warsztatkodu.pl
Description: Plugin load next page post use AJAX
Version: 1.0.0
Author: Sebastian Wesołowski
Author URI: warsztatkodu.pl
Copyright: Sebastian Wesołowski
*/

add_action('template_redirect', 'pbd_alp_init');
  function pbd_alp_init() {
    global $wp_query;

    if( is_home() || is_singular('post') ) {
        
        wp_enqueue_script('pbd-alp-load-posts',plugin_dir_url( __FILE__ ) . 'assets/js/SW_ajax-load-post.js',array('jquery'),'1.0', true);
        $paged = ( get_query_var('paged') > 1 ) ? get_query_var('paged') : 1;
        $max = $wp_query->max_num_pages;

        wp_localize_script(
            'pbd-alp-load-posts',
            'WK__loadPostAjaxObject',
            array(
                'ajax_url' => admin_url( 'admin-ajax.php' ),
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'security' => wp_create_nonce("load_more_posts"),
                'allPost' => wp_count_posts()->publish,
                'startPage' => $paged,
                'nextLink' => next_posts($max, false),
                'blogUrl' => get_permalink( get_option( 'page_for_posts' ), false ),
                'we_value' => 1234
            )
        );
    }
}

?>
