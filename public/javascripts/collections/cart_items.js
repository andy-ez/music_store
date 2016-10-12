var CartItems = Backbone.Collection.extend({
  addItem: function(item){
    var cart_item = App.cart.findWhere({title: item.get('title')});
    if (cart_item){
      cart_item.set('quantity', cart_item.get('quantity') + 1);
    }else{
      item = item.clone();
      item.set("quantity", 1);
      this.add(item);
    }
    this.setTotal();
    this.setQuantity();
    this.trigger("cart_updated");
  },
  removeItem: function(item){
    var cart_item = App.cart.findWhere({title: item.get('title')});
    this.remove(item);
    this.setTotal();
    this.setQuantity();
    this.trigger("cart_updated");
  },
  setQuantity: function(){
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0)
  },
  setTotal: function(){
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0)
  },
  getTotal: function(){
    return this.total;
  },
  getQuantity: function(){
    return this.quantity;
  }
});