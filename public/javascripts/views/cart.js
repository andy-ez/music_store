var CartView = Backbone.View.extend({
  template: App.templates.cart,
  events: {
    "click ul li a": "removeItem"
  },
  removeItem: function(e) {
    e.preventDefault();
    var model = this.collection.findWhere({id: +$(e.currentTarget).attr('data-id')});
    App.trigger('remove_from_cart', model);
  },
  render: function(){
    this.$el.html(this.template({
      quantity: this.collection.getQuantity(),
      items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
    $("#cart").html(this.$el.html());
  },
  initialize: function(){
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }
})