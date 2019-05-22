
<?php

/**
 * Plugin Name:      sw_ajax-load-post
 * Plugin URI:       https://github.com/sebastianwesolowski/sw_ajax-load-post
 * Description:      Plugin load next page post use AJAX
 * Version:          1.0.0
 * Author:           Sebastian Wesołowski
 * Author URI:       warsztatkodu.pl, wesolowski.dev
 * Text Domain:      sw_ajax-load-post
 * Domain Path:      /resources/lang
 * License:          MIT
 * License URI:      http://opensource.org/licenses/MIT
 *
 * @package         sw_ajax-load-post
 */
// https://premium.wpmudev.org/blog/using-ajax-with-wordpress/
// https://www.problogdesign.com/wordpress/load-next-wordpress-posts-with-ajax/
add_action('template_redirect', 'pbd_alp_init');
function pbd_alp_init()
{
    global $wp_query;

    // Add code to index pages.
    if (is_home() || is_singular('post')) {
        // TODO:// Rozszerzyć o query load ajax

        // Queue JS and CSS
        wp_enqueue_script('pbd-alp-load-posts', plugin_dir_url(__FILE__) . 'assets/js/sw-ajax-load-post.js', array('jquery'), '1.0', true);

        // What page are we on? And what is the pages limit?
        $paged = (get_query_var('paged') > 1) ? get_query_var('paged') : 1;
        $max = $wp_query->max_num_pages;

        wp_localize_script(
            'pbd-alp-load-posts',
            'WK__loadPostAjaxObject',
            array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'ajaxurl' => admin_url('admin-ajax.php'),
                'security' => wp_create_nonce("load_more_posts"),
                'allPost' => wp_count_posts()->publish,
                'startPage' => $paged,
                'nextLink' => next_posts($max, false),
                'blogUrl' => get_permalink(get_option('page_for_posts'), false),
                'we_value' => 1234,
            )
        );
    }
}
// TODO:// Rozszerzyć o query load ajax
// include 'php-query-load-ajax.php';
?>
