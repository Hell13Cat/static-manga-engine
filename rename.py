import os

def get_dirs(ref):
    fullpaths = get_difi(ref)
    dirs = []
    for file in fullpaths:
        if os.path.isdir(file): dirs.append(file)
    return dirs

def get_files(ref):
    fullpaths = get_difi(ref)
    files = []
    for file in fullpaths:
        if os.path.isfile(file): files.append(file)
    return files

def get_difi(dirname):
    dirfiles = os.listdir(dirname)
    fullpaths = map(lambda name: os.path.join(dirname, name), dirfiles)
    return fullpaths

root_dir = "img/AngelsOfDeathZero/18"
listfile = get_files(root_dir)
for ii in listfile:
    if "bmp" in ii:
        name_short = ii.split("\\")
        name_ready = name_short[1].split(".")[0] + "." + name_short[1].split("-")[-1]
        name_long_ready = root_dir+"/"+name_ready
        os.rename(ii, name_long_ready)
        print(name_long_ready)
