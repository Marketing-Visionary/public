<div id="am-toc-container"></div>

<script>
(function() {
  window.addEventListener('load', function() {
    setTimeout(buildToc, 500);
  });
  
  function buildToc() {
    const tocContainer = document.getElementById('am-toc-container');
    if (!tocContainer) {
      console.log('ToC container not found');
      return;
    }
    
    const richTextBlocks = document.querySelectorAll('.w-richtext');
    const excludeTerms = ['key takeaway', 'reference', 'table of contents', 'conclusion'];
    
    // First pass: count valid H2s
    let h2Count = 0;
    richTextBlocks.forEach(block => {
      const h2 = block.querySelector('h2');
      if (h2) {
        const h2Text = h2.textContent.trim();
        if (h2Text && !excludeTerms.some(term => h2Text.toLowerCase().includes(term))) {
          h2Count++;
        }
      }
    });
    
    const isCollapsible = h2Count >= 5;
    console.log('Found ' + h2Count + ' H2 sections. Collapsible: ' + isCollapsible);
    
    let tocHTML = '<h3 class="heading-small">Table of Contents</h3><nav class="am-toc"><ul class="am-toc-list">';
    let tocItemsAdded = 0;
    
    richTextBlocks.forEach(block => {
      const h2 = block.querySelector('h2');
      if (!h2) return;
      
      const h2Text = h2.textContent.trim();
      
      if (!h2Text || excludeTerms.some(term => h2Text.toLowerCase().includes(term))) {
        return;
      }
      
      let h2Id = h2.id;
      if (!h2Id) {
        h2Id = h2Text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        h2.id = h2Id;
      }
      
      const h3s = block.querySelectorAll('h3');
      const hasH3s = h3s.length > 0;
      
      tocHTML += '<li class="am-toc-h2-item">';
      
      tocHTML += '<div class="am-toc-h2-wrapper">';
      
      // Only add toggle if collapsible AND has H3s
      if (isCollapsible && hasH3s) {
        tocHTML += '<span class="am-toc-toggle" data-expanded="false"></span>';
      } else if (hasH3s) {
        tocHTML += '<span class="am-toc-spacer"></span>';
      }
      
      tocHTML += '<a href="#' + h2Id + '" class="am-toc-h2-link">' + h2Text + '</a>';
      tocHTML += '</div>';
      
      if (hasH3s) {
        // Show H3s by default if not collapsible, hide if collapsible
        const displayStyle = isCollapsible ? 'display: none;' : '';
        tocHTML += '<ul class="am-toc-h3-list" style="' + displayStyle + '">';
        
        h3s.forEach(h3 => {
          const h3Text = h3.textContent.trim();
          if (!h3Text) return;
          
          let h3Id = h3.id;
          if (!h3Id) {
            h3Id = h3Text.toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
            h3.id = h3Id;
          }
          
          tocHTML += '<li class="am-toc-h3-item">';
          tocHTML += '<a href="#' + h3Id + '" class="am-toc-h3-link">' + h3Text + '</a>';
          tocHTML += '</li>';
        });
        
        tocHTML += '</ul>';
      }
      
      tocHTML += '</li>';
      tocItemsAdded++;
    });
    
    tocHTML += '</ul></nav>';
    
    if (tocItemsAdded > 0) {
      tocContainer.innerHTML = tocHTML;
      console.log('✓ ToC built with ' + tocItemsAdded + ' sections');
      
      // Only add toggle functionality if collapsible
      if (isCollapsible) {
        tocContainer.querySelectorAll('.am-toc-toggle').forEach(toggle => {
          toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('data-expanded') === 'true';
            const h3List = this.closest('.am-toc-h2-item').querySelector('.am-toc-h3-list');
            
            if (h3List) {
              if (isExpanded) {
                h3List.style.display = 'none';
                this.classList.remove('expanded');
                this.setAttribute('data-expanded', 'false');
              } else {
                h3List.style.display = 'block';
                this.classList.add('expanded');
                this.setAttribute('data-expanded', 'true');
              }
            }
          });
        });
      }
      
      // Add smooth scrolling to all links
      tocContainer.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  }
})();
</script>

<style>
.am-toc-list {
  list-style: none !important;
  list-style-type: none !important;
  padding-left: 0;
  margin: 0;
  font-size: 0.9em;
}

.am-toc-h2-item {
  margin-bottom: 0.6em;
  list-style: none !important;
  list-style-type: none !important;
}

.am-toc-h2-item::before {
  display: none !important;
}

.am-toc-h2-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.am-toc-toggle {
  cursor: pointer;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 3px;
  position: relative;
  user-select: none;
  transition: transform 0.2s ease;
}

.am-toc-toggle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 7px;
  border-color: transparent transparent transparent #666;
  transition: transform 0.2s ease;
}

.am-toc-toggle.expanded::before {
  transform: translate(-50%, -50%) rotate(90deg);
}

.am-toc-spacer {
  width: 14px;
  flex-shrink: 0;
}

.am-toc-h2-link {
  text-decoration: none;
  font-weight: 400;
  color: inherit;
  line-height: 1.4;
  flex: 1;
}

.am-toc-h2-link:hover {
  text-decoration: underline;
}

.am-toc-h3-list {
  list-style: none !important;
  list-style-type: none !important;
  padding-left: 22px;
  margin-top: 0.4em;
  margin-bottom: 0;
}

.am-toc-h3-item {
  margin-bottom: 0.35em;
  line-height: 1.3;
  list-style: none !important;
  list-style-type: none !important;
}

.am-toc-h3-item::before {
  display: none !important;
}

.am-toc-h3-link {
  text-decoration: none;
  font-weight: 300;
  font-size: 0.92em;
  color: inherit;
  opacity: 0.85;
}

.am-toc-h3-link:hover {
  text-decoration: underline;
  opacity: 1;
}
</style>
