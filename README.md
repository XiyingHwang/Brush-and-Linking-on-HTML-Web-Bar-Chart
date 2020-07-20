# Brush-and-Linking-on-HTML-Web-Bar-Chart
This assignment requires your to build a visualization that utilizes multiple coordinated views using brushing and linking. You are given (in the starting code) two scatterplots that show different attributes of your data. Your task in this assignment is to add the interactivity that allows selections in one view to highlight corresponding data points in the other view (i.e., brushing and linking).

The dataset you will use for this assignment consists of SAT scores. For the first scatterplot, SAT mathematics scores (SATM) should be mapped to the x coordinate and the SAT verbal scores should be assigned to y coordinate. For the second scatterplot, the ACT attribute should be mapped to the x coordinate and the GPA attribute should be mapped to the y coordinate. Each scatterplot should be drawn in an svg element of size 400x400px.

The resulting visualization should look very similar to the video uploaded to Canvas to demonstrate how the interaction and visualization should behave.

Starter code
The starter code for this assignment is available on Canvas. You are required to use the starter code for this programming assignment.

The dataset for P4 is included in the starter code. Do not edit, rename, or change this dataset.

What to turn in
Compress your code directory into a .zip and submit to Canvas before the deadline.

Grading
Your assignment will be graded along the following requirements:

One scatterplot with SATM and SATV axes (note that these may intentionally not be correct in the starter code)
The second scatterplot with ACT and GPA axes (note that these may intentionally not be correct in the starter code)
When users click on a point in either scatterplot, the actual numerical values of the fields for that particular student are displayed in a separate table (details on demand). 
When users drag the mouse on either scatterplot, a rectangular brush is drawn on that scatterplot, indicating the region of interest. All the points inside that region are considered selected and should be highlighted on the other scatterplot.
The rectangular selection should be draggable by clicking and dragging the left mouse button.
When users click on a point (or select multiple points) in either scatterplot, the corresponding point(s) on the other scatterplot are highlighted. 
When switching brushing between visualizations, the previous brush should be cleared. For example, brushing in view 1, then brushing in view 2, the brush in view 1 should be cleared (removed).
Example expected behavior (also, see video in Starter Code in Canvas):

I select one point in a scatterplot. I should see the details of that point, as well as the point highlighted in the second scatterplot.
I click on a region without a point, all selections (and details) clear.
I select a region of points in one scatterplot. No details should be shown (since I selected multiple points), and the corresponding points should highlight in the second scatterplot.
I drag around the selection box, which should change the corresponding points highlighted in the second scatterplot as I move the selection box.
I start drawing a new selection box. The old selection box should clear (and all corresponding highlighted points), and new points should start to highlight based on my new selection. Note that the new selection box could be started in either scatterplot (left of right).
I click on a single point, and the details are shown, and all highlights are cleared.
You will not lose points on any of the following:

The styling of the charts, axes or labels
The colors you decide to use
Conventions or legibility of your code
