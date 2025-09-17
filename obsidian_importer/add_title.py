import sys,os
from pathlib import Path


posts_dir = os.path.abspath("../docs/posts/Causal inference")
print(posts_dir)

def add_frontmatter(path):
    for i in os.listdir(path):
        if os.path.isdir(os.path.join(path,i)):
            add_frontmatter(os.path.join(path,i))
        elif i.endswith(".md"):
            name = i[:-3]
            print(name)
            tag0 = os.path.basename(path)
            tag1 = os.path.basename(Path(path).parent)
            print(tag0,tag1)
            with open(os.path.join(path,i),"r+b") as f:
                old = f.read()
                f.seek(0,0)
                f.write("---\n".encode(encoding="utf-8"))
                lines = [f"title: {name}\n",\
                            "category: Causal inference\n",\
                            f"tags: [{tag0},{tag1}]\n"]
                newlines = []
                for line in lines:
                    newlines.append(line.encode(encoding="utf-8"))
                f.writelines(newlines)
                f.write("\n---\n".encode(encoding="utf-8"))
                f.write(old)

add_frontmatter(posts_dir)
