---
title: How does diffusion model work
category: Machine Learning
tags: [Machine Learning,diffusers]

---

At its heart, a diffusion model is a generative model, which means its primary purpose is to create new data that is similar to the data it was trained on. In the context of images, this means generating new, realistic-looking pictures. The core idea behind diffusion models is both elegant and surprisingly intuitive: **to learn how to create data, you should first learn how to destroy it.**

The entire process can be broken down into two main stages: the **forward process** and the **reverse process**.

### The Forward Process: Systematically Destroying an Image

The forward process, also known as the diffusion process, is the "destruction" phase. It's a fixed procedure, meaning it doesn't involve any learning. Here's what happens step-by-step:

1.  **Start with a real image** from your training dataset (e.g., a picture of a cat).
2.  **Gradually add a small amount of Gaussian noise** to the image. Gaussian noise is a type of random statistical noise that follows a bell curve distribution, often resembling static on an old television.
3.  **Repeat this process** over and over again, adding a little more noise at each step. This is done for a predefined number of timesteps, often denoted as `T` (which could be, for example, 1000).

The key here is that the noise is added in a controlled manner. We know exactly how much noise is being added at each timestep. As you progress through these timesteps, the original image becomes increasingly corrupted. By the final timestep `T`, the image is indistinguishable from pure, random noise.

Think of it like adding a drop of black ink to a glass of clear water every second. Initially, you can still see through the water, but after many drops, the water becomes completely opaque. The forward process is this journey from a clear image to pure noise.

### The Reverse Process: Learning to Recreate the Image

This is where the magic and the machine learning happen. The goal of the reverse process is to undo the forward process. It starts with random noise and gradually removes it to generate a clean, coherent image.

To do this, we need a powerful neural network. In most modern diffusion models, this is a **U-Net architecture**. Here's how it's trained and what it does:

1.  **Input:** The U-Net is given a noisy image from a specific point in the forward process (say, the image at timestep `t`).
2.  **The Goal:** Its task is not to directly guess the final clean image. Instead, it is trained to **predict the noise** that was added to the image at that particular timestep `t`.
3.  **Training:** We can train this network because we know the original image and we know exactly how much noise was added at each step in the forward process. So, we can give the network the noisy image and ask it to predict the noise. We then compare its prediction to the actual noise that was added and adjust the network's parameters to make its prediction more accurate. This is repeated for countless images at all possible timesteps.

### Generating a New Image

Once the U-Net is well-trained, we can use it to generate new images from scratch:

1.  **Start with Pure Noise:** We generate a random image that is pure Gaussian noise. This is our starting point at timestep `T`.
2.  **Iterative Denoising:**
    *   We feed this noisy image into our trained U-Net and also tell it that we are at timestep `T`.
    *   The U-Net analyzes the image and predicts the noise component within it.
    *   We then subtract a small amount of this predicted noise from the image. This gives us a slightly less noisy image, corresponding to the image at timestep `T-1`.
3.  **Repeat:** We take this new, slightly cleaner image, tell the U-Net we are now at timestep `T-1`, and repeat the process. The U-Net again predicts the noise, and we subtract it.
4.  **Final Image:** We continue this iterative denoising process all the way down to timestep `t=0`. By this point, if the model is well-trained, we will have a clean, realistic-looking image that is entirely new but shares the characteristics of the images the model was trained on.

In essence, the diffusion model learns the path from noise back to a clear image by mastering the art of predicting and removing that noise, one small step at a time. This gradual, step-by-step refinement is what allows these models to generate such incredibly detailed and coherent images.e such incredibly detailed and coherent images.