notification :off


# MATCHA TO SHOPIFY SYNC:
# =======================================

# COPY ALL SHARED ASSET FILES TO SHOPIFY DIR
guard :copy, :from => '_site/assets', :to => 'shopify/assets', :run_at_start => true do
  watch(%r{^shared+(.js|.css)$})
end

guard 'jekyll-plus', :serve => true do
  watch /.*/
  ignore /^_site/
end
