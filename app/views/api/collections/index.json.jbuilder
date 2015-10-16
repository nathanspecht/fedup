json.array!(@collections) do |col|
  json.partial!('collection', col: col)
end
