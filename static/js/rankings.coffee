loadUrl = (url) ->
  $.get url,
    success: (response) ->
      console.log response

$ ->
  console.log "Testing"
