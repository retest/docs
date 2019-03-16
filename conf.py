# https://docs.readthedocs.io/en/latest/guides/adding-custom-css.html
def setup(app):
    app.add_stylesheet('css/custom.css')

# https://sphinx-rtd-theme.readthedocs.io/en/latest/configuring.html#other-configuration
html_theme_options = {
    'analytics_id': 'UA-135634327-1',  # Google Analytics ID
    'style_external_links': True,
    'github_url': 'https://github.com/retest/docs',
    'html_logo': 'logo.svg'
}
