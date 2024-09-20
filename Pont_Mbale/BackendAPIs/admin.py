from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from BackendAPIs.BackendModels.blog_model import BlogPost, Tag, Category
from BackendAPIs.BackendModels.setting_model import ImageLibrary, Settings
from BackendAPIs.BackendModels.contentgallery_model import Content_Gallery
from BackendAPIs.BackendModels.About_Pont.historycontent_model import HistoryContent
from BackendAPIs.BackendModels.About_Pont.about_model import About
from BackendAPIs.BackendModels.Projects.progressbar_model import ProgressiveBar
from BackendAPIs.BackendModels.Projects.project_model import ProjectsTypes, Projects
from BackendAPIs.BackendModels.Projects.ProjectContent_model import ProjectContent
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.utils.html import format_html

# Register your models here.

class AdminOverviewOnPost(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at', 'category')
    # list_filter = ()


admin.site.register(BlogPost, AdminOverviewOnPost)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(ImageLibrary)
admin.site.register(Content_Gallery)
admin.site.register(HistoryContent)
admin.site.register(About)
admin.site.register(ProgressiveBar)
admin.site.register(ProjectsTypes)
admin.site.register(ProjectContent)
admin.site.register(Projects)
admin.site.register(Settings)