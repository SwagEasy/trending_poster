############################
# Models
############################

ShopItem = Backbone.Model.extend
  defaults:
    name: "Some Item"
    img: "/default.png"
    description: "This is the default item."
    rank: 0

Ranking = Backbone.Collection.extend
  model: ShopItem
  comparator: 'rank'

############################
# Views
############################

RankView = Backbone.View.extend
  initialize: ->
    @collection.bind 'add', @render, @
    @render()
  render: ->
    renderedShopItems = @collection.map (shopItem) ->
      _.template $('#ranking-item').html(), shopItem: shopItem

    template = _.template $("#ranking-list").html(), shopItems: renderedShopItems
    @$el.html template

getRankingsFromUrl = (url) ->
  results = [
    {
      name: "Dildo"
      img: "http://upload.wikimedia.org/wikipedia/commons/9/93/Dildos_o_Consoladores_Nena.jpg"
      description: "A dildo is a sex toy, often explicitly phallic in appearance, intended for bodily penetration during masturbation or sex with partners."
    },
    {
      name: "Potato"
      img: "http://upload.wikimedia.org/wikipedia/commons/4/4c/Potato_heart_mutation.jpg"
      description: "Potatoes are delicious, particularly if you are Irish"
    },
    {
      name: "Egg"
      img: "http://upload.wikimedia.org/wikipedia/commons/4/4c/Potato_heart_mutation.jpg"
      description: "Eggs are slightly less delicious than potatoes"
    }
  ]
  # results = $.getJSON url

  for result, i in results
    result.ranking = i

  results.map (result) ->
    new ShopItem result

$ ->
  rankings = ['free', 'paid', 'grossing']
  rankings.map (type) ->
    data = new Ranking getRankingsFromUrl("#{type}.json")
    paidView = new RankView el: $("##{type}"), collection: data
