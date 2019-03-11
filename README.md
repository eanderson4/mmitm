
website: <a href="http://meetmeinthemountains.com">meetmeinthemountains.com</a>

# Meet Me in the Mountains (MMitM)

A spot to discuss resorts, both lost and new.

## About

## Contributing

Prereqs Installed

- [git](https://gist.github.com/derhuerst/1b15ff4652a867391f03)
- [hugo](https://gohugo.io/getting-started/installing/)


1. Clone repository

```
git clone --recurse-submodules https://github.com/eanderson4/mmitm
```

2. Enter directory, create branch for new work

```
cd mmitm
git checkout -b "lost-resort-posts"
```

3.  Make changes

- Add new posts in content/en/posts
- Adjust styles or javascript in static/css or static/js
- Adjust templates in layouts/

4.  Commit changes

```
git commit -am "content: Added saint marys glacier"
```

5.  Push changes, create pull request

```
git push origin lost-resort-posts
```