import os

posts_dir = os.path.abspath("../docs/posts/Causal inference")
print(posts_dir)

def remove_toml(path):
    for i in os.listdir(path):
        if os.path.isdir(os.path.join(path,i)):
            remove_toml(os.path.join(path,i))
        elif i.endswith(".md"):
            split_counter = 0
            print(i)
            with open(os.path.join(path,i),"r+b") as f:
                while True:
                    line = f.readline()
                    if line == "":
                        break
                    if line.decode(encoding="utf-8").startswith("---"):
                        split_counter += 1
                    if split_counter == 2:
                        f.seek(f.tell())
                        new = f.read()
                        f.seek(0)
                        f.write(new)
                        break
                    else:
                        break

remove_toml(posts_dir)
