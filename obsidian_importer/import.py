import sys,os

posts_dir = os.path.abspath("../machine_learning")
print(posts_dir)

def add_title(path):
    for i in os.listdir(path):
        if os.path.isdir(os.path.join(path,i)):
            add_title(os.path.join(path,i))
        elif i.endswith(".md"):
            name = i[:-3]
            print(name)
            with open(os.path.join(path,i),"r+") as f:
                old = f.read()
                if old.startswith("---\n title:"):
                    continue
                else:
                    with open(os.path.join(path,"blogged-"+i),"w") as fp:
                        fp.seek(0,0)
                        fp.write(f"\n---\n title: {name} \n---\n")
                        fp.write(old)

add_title(posts_dir)
