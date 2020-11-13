## インストール

`npm install`

## 実行

`npm run gulp`

gulp4 を使用しているため、global の gulp が 3 の場合エラーになる。
それを回避するため、local にインストールした gulp4 を使って起動させる。

## postcss-preset-env とは

https://preset-env.cssdb.org/
https://qiita.com/naru0504/items/86bc7c6cab22a679553e

## 使える機能

https://preset-env.cssdb.org/features

## scss → css features(cssnexr)

1.

```
.foo {
  color: red;
  .bar {
    color: blue;
  }
}
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
.foo {
  color: red;
  & .bar {
    color: blue;
  }
}
```

```
.foo {
  color: red;
}
.foo .bar {
  color: blue;
}
```

2.

```
.foo {
  color: red;
  &.bar {
    color: blue;
  }
}
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
.foo {
  color: red;
  &.bar {
    color: blue;
  }
}
```

```
.foo {
  color: red;
}
.foo.bar {
  color: blue;
}
```

3.

```
.foo {
  color: red;
  .parent & {
    color: blue;
  }
}
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
.foo {
  color: red;
  @nest .parent & {
    color: blue;
  }
}
```

```
.foo {
  color: red;
}
.parent .foo {
  color: blue;
}
```

## 機能が足りなかったら、別途 postcss のプラグインをインストールする必要あり
