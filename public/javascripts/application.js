var App = {
  templates: JST,
  $el: $('main'),
  indexView: function(){
    this.index = new IndexView();
    this.renderAlbums();
    this.createCart();
    this.bindEvents();
  },
  renderAlbumview: function(album){
    new AlbumView({
      model: album
    })
  },
  renderAlbums: function(){
    this.albums.each(this.renderAlbumview);
  },
  newAlbum: function(){
    new NewAlbumView();
  },
  createCart: function(){
    this.cart = new CartItems();
    this.cart_view = new CartView({
      collection: this.cart
    })
  },
  bindEvents: function(){
    _.extend(this, Backbone.Events);
    this.listenTo(this.index, "add_album", this.newAlbum);
    this.on("add_to_cart", this.cart.addItem.bind(this.cart));
    this.on("remove_from_cart", this.cart.removeItem.bind(this.cart));
  }
};

Handlebars.registerHelper("format_price", function(price){
  return (+price).toFixed(2);
})