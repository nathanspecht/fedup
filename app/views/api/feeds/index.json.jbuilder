json.array!(@feeds) do |feed|
  json.partial!('feed', feed: feed)
end
