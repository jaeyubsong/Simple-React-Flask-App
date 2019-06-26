from sklearn.cluster import KMeans as KM
import argparse
import cv2
import webcolors


# Familiar color list
familiar_color = {'aqua': '#00ffff', 'black': '#000000', 'blue': '#0000ff', 'fuchsia': '#ff00ff',
                  'green': '#008000', 'gray': '#808080', 'lime': '#00ff00', 'maroon': '#800000',
                  'navy': '#000080', 'olive': '#808000', 'purple': '#800080', 'red': '#ff0000',
                  'silver': '#c0c0c0', 'teal': '#008080', 'white': '#ffffff', 'yellow': '#ffff00',
                  'orange': '#ffa500'}

# Get closest familiar color name
def get_color_name(rgb_):
    min_colors = {}
    for key, name in webcolors.css21_hex_to_names.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - rgb_[0]) ** 2
        gd = (g_c - rgb_[1]) ** 2
        bd = (b_c - rgb_[2]) ** 2
        min_colors[(rd + gd + bd)] = name
    return min_colors[min(min_colors.keys())]


# Construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True, help="Input Image Path")
ap.add_argument("--clusters", required=True, type=int, help="# of clusters")
args = vars(ap.parse_args())

image = cv2.imread(args["image"])
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)


# Reshape the image to be a list of pixels
image = image.reshape((image.shape[0] * image.shape[1], 3))


# K-Means Clustering
clt = KM(n_clusters = args["clusters"])
clt.fit(image)


# Get dominant colors
colors = clt.cluster_centers_.astype("uint8").tolist()
for rgb in colors:
    color_name = get_color_name(rgb)
    print("Dominant color :", color_name)

