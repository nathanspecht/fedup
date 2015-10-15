json.array!(@articles) do |article|
  json.partial!('article', article: article)
end
