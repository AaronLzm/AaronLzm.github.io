import sys,os

posts_dir = os.path.abspath("../docs/posts/machine_learning")
print(posts_dir)

def add_frontmatter(path):
    for i in os.listdir(path):
        if os.path.isdir(os.path.join(path,i)):
            add_frontmatter(os.path.join(path,i))
        elif i.endswith(".md"):
            name = i[:-3]
            print(name)
            tag = os.path.basename(path)
            print(tag)
            with open(os.path.join(path,i),"r+b") as f:
                old = f.read()
                f.seek(0,0)
                f.write("---\n".encode(encoding="utf-8"))
                lines = [f"title: {name}\n",\
                            "category: Machine Learning\n",\
                            f"tags: [Machine Learning,{tag}]\n"]
                newlines = []
                for line in lines:
                    newlines.append(line.encode(encoding="utf-8"))
                f.writelines(newlines)
                f.write("\n---\n".encode(encoding="utf-8"))
                f.write(old)

add_frontmatter(posts_dir)
